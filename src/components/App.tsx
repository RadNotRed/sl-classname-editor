import * as React from 'react';
import { Suspense, lazy } from 'react';

const ThemeToggle = lazy(() => import('./ThemeToggle'));
const ClassList = lazy(() => import('./ClassList'));

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeToggle />
        <div className="container">
          <ClassList />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
