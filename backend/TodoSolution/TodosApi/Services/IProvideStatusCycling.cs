namespace TodosApi.Services
{
    public interface IProvideStatusCycling
    {
        TodoListItemResponseModel ProvideNextStatusFrom(TodoListItemResponseModel savedItem);
    }
}