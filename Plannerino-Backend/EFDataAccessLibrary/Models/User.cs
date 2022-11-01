namespace EFDataAccessLibrary.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public bool IsAdmin { get; set; }
        public List<Event> Events { get; set; } = new List<Event>();
        public List<Group> Groups { get; set; } = new List<Group>();
        public List<UserTask> Tasks { get; set; } = new List<UserTask>();


    }
}
