import { collatedTasks } from "../helpers";

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);
