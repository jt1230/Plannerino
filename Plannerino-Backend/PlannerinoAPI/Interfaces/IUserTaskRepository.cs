using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IUserTaskRepository
    {
        ICollection<UserTask> GetUserTasks();
        UserTask GetUserTask(int id);
        UserTask GetUserTaskByCategory(string category);
        UserTask GetUserTaskByUser(int userId);
        bool UserTaskExists(int id);
        
    }
}
