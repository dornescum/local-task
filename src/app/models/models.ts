export interface User {
  id?: string;
  email: string;
  password: string;
}


export interface Task {
  id: string;
  title: string;
  description: string;
  userId?: string;
}

