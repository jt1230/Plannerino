using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User GetUser(int id);
        User GetUserByEmail(string email);
        User GetUserByEmailAndPwd(string email, string pwd);
        ICollection<Event> GetEventsFromAUser(int eventId);
        ICollection<Task> GetTasksFromAUser(int taskId);
        bool UserExists(int id);
        
    }
}
