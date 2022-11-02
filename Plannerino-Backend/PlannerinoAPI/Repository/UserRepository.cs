using PlannerinoAPI.Data;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly PlannerinoContext _context;

        public UserRepository(PlannerinoContext context)
        {
            _context = context;
        }
        
        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.First(u => u.Id == id);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.First(u => u.Email == email);
        }

        public User GetUserByEmailAndPwd(string email, string pwd)
        {
            return _context.Users.First(u => u.Email == email && u.Password == pwd);
        }
        public ICollection<Event> GetEventsFromAUser(int eventId)
        {
            throw new NotImplementedException();
        }

        public ICollection<Task> GetTasksFromAUser(int taskId)
        {
            throw new NotImplementedException();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }

    }
}
