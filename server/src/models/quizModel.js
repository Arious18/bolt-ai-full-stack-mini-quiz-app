import pool from '../db/connection.js';

export const quizModel = {
  async createResult(result) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insert quiz result
      await connection.execute(
        'INSERT INTO quiz_results (id, user_id, score, total_questions) VALUES (?, ?, ?, ?)',
        [result.id, result.userId, result.score, result.totalQuestions]
      );

      // Insert user answers
      for (const answer of result.answers) {
        await connection.execute(
          'INSERT INTO user_answers (id, result_id, question_id, selected_answer, is_correct) VALUES (?, ?, ?, ?, ?)',
          [crypto.randomUUID(), result.id, answer.questionId, answer.selectedAnswer, answer.isCorrect]
        );
      }

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getUserResults(userId) {
    const [results] = await pool.execute(
      `SELECT r.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'questionId', a.question_id,
            'selectedAnswer', a.selected_answer,
            'isCorrect', a.is_correct
          )
        ) as answers
      FROM quiz_results r
      LEFT JOIN user_answers a ON r.id = a.result_id
      WHERE r.user_id = ?
      GROUP BY r.id
      ORDER BY r.date DESC`,
      [userId]
    );
    return results;
  }
};