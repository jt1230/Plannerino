using Microsoft.EntityFrameworkCore;
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
        
        public ICollection<User> GetAllUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetUserByEmailAndPwd(string email, string pwd)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email && u.Password == pwd);
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}
