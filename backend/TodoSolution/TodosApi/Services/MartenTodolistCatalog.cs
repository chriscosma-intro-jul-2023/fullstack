using Marten;

namespace TodosApi.Services;

public class MartenTodolistCatalog : IManageTheTodolistCatalog
{
    private readonly IDocumentSession _documentSession;

    public MartenTodolistCatalog(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task<TodoListItemResponseModel> AddTodoItemAsync(TodoListCreateModel request)
    {
        var response = new TodoListItemResponseModel(Guid.NewGuid(), request.Description, TodoItemStatus.Later);

        _documentSession.Store(response);
        await _documentSession.SaveChangesAsync();

        return response;
    }

    public async Task<CollectionResponse<TodoListItemResponseModel>> GetFullListAsync()
    {
        var response = await _documentSession.Query<TodoListItemResponseModel>().ToListAsync();

        return new CollectionResponse<TodoListItemResponseModel>(response);
    }
}
