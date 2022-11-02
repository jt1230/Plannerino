using PlannerinoAPI.Data;
using PlannerinoAPI.Interfaces;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Repository
{
    public class GroupRepository : IGroupRepository
    {
        private readonly PlannerinoContext _context;

        public GroupRepository(PlannerinoContext context)
        {
            _context = context;
        }

        public ICollection<Group> GetGroups()
        {
            return _context.Groups.OrderBy(g => g.Id).ToList();
        }

        public Group GetGroup(int id)
        {
            return _context.Groups.First(g => g.Id == id);
        }

        public bool GroupExists(int id)
        {
            return _context.Groups.Any(g => g.Id == id);
        }
    }    
}
