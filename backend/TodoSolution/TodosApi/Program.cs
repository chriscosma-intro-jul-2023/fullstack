using Marten;
using System.Text.Json.Serialization;
using TodosApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Microsoft stuff for creating instances of controllers, etc.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
// Microsoft stuff for making endpoints visible to tools
builder.Services.AddEndpointsApiExplorer();
// The service that uses the one above to translate to OpenApi
builder.Services.AddSwaggerGen();

// Setup Marten
var dataConnectionString = builder.Configuration.GetConnectionString("todos") ?? throw new Exception("Need a database connection string");
builder.Services.AddMarten(options =>
{
    options.Connection(dataConnectionString);
    // Good for development, it creates everything
    options.AutoCreateSchemaObjects = Weasel.Core.AutoCreate.All;
});

builder.Services.AddTransient<IManageTheTodolistCatalog, MartenTodolistCatalog>();

// --- Everything above this line is configuring "Services" in our application ---

// This is configuring the "middleware" - this is code that sees incoming HTTP requests
// and makes a response
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Generates the documentation which is a JSON file (aka Swagger file)
    app.UseSwagger();
    // Adds middleware that lets you interact with that documentation
    app.UseSwaggerUI();
}

app.UseAuthorization();

// The Api, during startup, is going to look at all our Controller classes, read the attributes, and create a route table
app.MapControllers();

// Start the Kestrel web server and listen for requests (blocking)
app.Run();
