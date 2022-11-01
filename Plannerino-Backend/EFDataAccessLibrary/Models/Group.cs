namespace EFDataAccessLibrary.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public User Creator { get; set; } = new User();
        public List<User> Users { get; set; } = new List<User>();
    }
}
