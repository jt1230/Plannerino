using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using PlannerinoAPI.Models;

namespace PlannerinoAPI.Data
{
    public class PlannerinoContext : DbContext
    {
        public PlannerinoContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<UserTask> Tasks { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }

        //public List<User> SeedUsers() {
        //    string file = File.ReadAllText("generatedUsers.json");
        //    var users = JsonSerializer.Deserialize<List<User>>(file);
        //    return users;
        //}

        //public List<Group> SeedGroups()
        //{
        //    string file = File.ReadAllText("generatedGroups.json");
        //    var groups = JsonSerializer.Deserialize<List<Group>>(file);
        //    return groups;
        //}

        //public List<UserGroup> SeedUserGroups()
        //{
        //    string file = File.ReadAllText("generatedUserGroups.json");
        //    var uGroups = JsonSerializer.Deserialize<List<UserGroup>>(file);
        //    return uGroups;
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Configure domain classes using modelBuilder here
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(g => g.GroupId);

            //modelBuilder.Entity<User>()
            //    .HasMany(g => g.Groups)
            //    .WithMany(ug => ug.Users)
            //    .UsingEntity<Dictionary<string, object>>("UserGroups",
            //        r => r.HasOne<Group>().WithMany().HasForeignKey("GroupId"),
            //        l => l.HasOne<User>().WithMany().HasForeignKey("UserId"),
            //        je =>
            //        {
            //            je.HasKey("GroupId", "UserId");
            //            je.HasData(
            //                new { UserId = 2, GroupId = 1 },
            //                new { UserId = 3, GroupId = 1 },
            //                new { UserId = 4, GroupId = 1 });
            //        });


            //modelBuilder.Entity<UserGroup>()
            //   .HasData(SeedUserGroups());

            //modelBuilder.Entity<User>()
            //   .HasData(SeedUsers());

            //modelBuilder.Entity<Group>()
            //   .HasData(SeedGroups());

            //modelBuilder.Entity<UserGroup>()
            //                .HasData(
            //                    new UserGroup { UserId = 2, GroupId = 1 },
            //                    new UserGroup { UserId = 3, GroupId = 1 },
            //                    new UserGroup { UserId = 4, GroupId = 1 });
        }
    }
}
