using Microsoft.EntityFrameworkCore;
using EFDataAccessLibrary.Models;

namespace EFDataAccessLibrary.DataAccess
{
    public class PlannerinoContext : DbContext
    {
        private const string DatabaseName = "PlannerinoDB";
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<UserTask> Tasks { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer($@"Server=(localdb)\mssqllocaldb;Database={DatabaseName};Trusted_Connection=True;");
        }
    }
}
