// user.model.ts
export interface User {
  id?: string;
  email: string;
  password: string;
}

// task.model.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  userId?: string;
}

