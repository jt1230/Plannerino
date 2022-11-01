//using System.Text.Json;
//using PlannerinoAPI.Data;
//using PlannerinoAPI.Models;

//namespace PlannerinoAPI.DataAccess
//{
//    public class Seeder
//    {
//        /// <summary>
//        /// Seeds the database with some data
//        /// </summary>
//        public static void SeedDB()
//        {
//            using (var db = new PlannerinoContext(db))
//            {

//                db.Database.EnsureDeleted();
//                db.Database.EnsureCreated();

//                if (db.Users.Count() == 0)
//                {
//                    string file = System.IO.File.ReadAllText("generatedUsers.json");
//                    var users = JsonSerializer.Deserialize<List<User>>(file);
//                    db.Users.AddRange(users);
//                    db.SaveChanges();
//                }

//                if (db.Groups.Count() == 0)
//                {
//                    var john = db.Users.FirstOrDefault(u => u.FirstName == "John");
//                    var mary = db.Users.FirstOrDefault(u => u.FirstName == "Mary");
//                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

//                    db.Groups.AddRange(new List<Group>
//                {
//                    new Group
//                    {
//                        Name = "Family Doe",
//                        Description = "Family Planner for the Doe family",
//                        Users = new List<User>{john, mary, jane},
//                        //Creator = jane,
//                    },
//                });
//                }

//                if (db.Tasks.Count() == 0)
//                {
//                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

//                    db.Tasks.Add(new UserTask
//                    {
//                        Title = "ICA",
//                        Description = "Buy milk",
//                        Category = "Grocery",
//                        IsCompleted = false,
//                        User = jane
//                    });
//                }

//                if (db.Events.Count() < 1)
//                {
//                    var jane = db.Users.FirstOrDefault(u => u.FirstName == "Jane");

//                    db.Events.Add(new Event
//                    {
//                        Title = "Family Dinner",
//                        Description = "Dinner's at Joe's",
//                        StartDate = new DateTime(2022, 10, 29, 18, 00, 00),
//                        EndDate = new DateTime(2022, 10, 29, 21, 30, 00),
//                        Type = "Home",
//                        User = jane
//                    });
//                }

//            }
//        }
//    }
//}