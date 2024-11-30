import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import useStore from '../store/useStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { addUser, setCurrentUser } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      results: [],
    };
    addUser(newUser);
    setCurrentUser(newUser);
    navigate('/quiz');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Programming Quiz
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Test your programming knowledge
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              label="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            Start Quiz
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;