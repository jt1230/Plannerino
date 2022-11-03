using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IUserTaskRepository
    {
        ICollection<UserTask> GetUserTasks();
        UserTask GetUserTask(int id);
        ICollection<UserTask> GetUserTasksByCategory(string category);
        bool CreateUserTask(UserTask userTask);
        bool UpdateUserTask(UserTask userTask);
        bool DeleteUserTask(UserTask userTask);
        bool UserTaskExists(int id);
    }
}
