using Marten;

namespace TodosApi.Services;

public class MartenTodolistCatalog : IManageTheTodolistCatalog
{
    private readonly IDocumentSession _documentSession;
    private readonly IProvideStatusCycling _statusCycler;

    public MartenTodolistCatalog(IDocumentSession documentSession, IProvideStatusCycling statusCycler)
    {
        _documentSession = documentSession;
        _statusCycler = statusCycler;
    }

    public async Task<TodoListItemResponseModel> AddTodoItemAsync(TodoListCreateModel request)
    {
        var response = new TodoListItemResponseModel(Guid.NewGuid(), request.Description, TodoItemStatus.Later);

        _documentSession.Store(response);
        await _documentSession.SaveChangesAsync();

        return response;
    }

    public async Task<TodoListItemResponseModel?> ChangeStatusAsync(TodoListItemRequestModel request)
    {
        // Check if in database, else, return null
        var savedItem = await _documentSession.Query<TodoListItemResponseModel>().Where(t => t.Id == request.Id).SingleOrDefaultAsync();
        if (savedItem == null) return null;
        // Change status of thing
        TodoListItemResponseModel updated = _statusCycler.ProvideNextStatusFrom(savedItem);
        // Save it
        _documentSession.Store(updated);
        await _documentSession.SaveChangesAsync();
        // Return saved thing back (not null) saying this worked ok
        return updated;
    }

    public async Task<CollectionResponse<TodoListItemResponseModel>> GetFullListAsync()
    {
        var response = await _documentSession.Query<TodoListItemResponseModel>().ToListAsync();

        return new CollectionResponse<TodoListItemResponseModel>(response);
    }
}
