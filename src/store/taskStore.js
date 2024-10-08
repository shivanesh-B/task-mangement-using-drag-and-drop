import create from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      currentFilter: 'all',
      addTask: (newTask) =>
        set((state) => ({
          tasks: [...state.tasks, { ...newTask, id: Date.now().toString() }],
        })),
      moveTask: (taskId, sourceStatus, destinationStatus) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
          const updatedTasks = [...state.tasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            status: destinationStatus,
          };
          return { tasks: updatedTasks };
        }),
      setFilter: (filter) => set({ currentFilter: filter }),
      getFilteredTasks: () => {
        const { tasks, currentFilter } = get();
        if (currentFilter === 'all') return tasks;
        return tasks.filter((task) => task.priority === currentFilter);
      },
      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'done'),
        })),
    }),
    {
      name: 'task-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useTaskStore;