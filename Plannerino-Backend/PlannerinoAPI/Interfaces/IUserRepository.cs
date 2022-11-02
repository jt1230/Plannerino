using PlannerinoAPI.Models;

namespace PlannerinoAPI.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetAllUsers();
        User GetUser(int id);
        User GetUserByEmail(string email);
        User GetUserByEmailAndPwd(string email, string pwd);
        bool UserExists(int id);
        
    }
}
