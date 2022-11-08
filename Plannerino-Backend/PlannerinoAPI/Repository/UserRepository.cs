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
        public bool CreateUser(int groupId, User user)
        {
            var userGroupEntity = _context.Groups.FirstOrDefault(u => u.Id == groupId);

            var userGroup = new UserGroup()
            {
                User = user,
                Group = userGroupEntity!
            };
            _context.Add(userGroup);
            return Save();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id)!;
        }

        public User GetUserByEmailAndPwd(string email, string pwd)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email && u.Password == pwd)!;
        }

        public ICollection<Group> GetGroupsFromAUser(int userId)
        {
            return _context.UserGroups.Where(e => e.UserId == userId).Select(ug => ug.Group).ToList();
        }

        public ICollection<Event> GetEventsFromAUser(int userId)
        {
            return _context.Events.Where(e => e.User.Id == userId).ToList();
        }

        public ICollection<UserTask> GetTasksFromAUser(int userId)
        {
            return _context.Tasks.Where(t => t.User.Id == userId).ToList();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }
        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return Save();
        }

        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return Save();
        }
    }
}
