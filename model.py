from pydantic import BaseModel


class Todo(BaseModel):
    id: int
    title: str
    description: str
    dayOfWeek: str


class TodoRequest(BaseModel):
    title: str
    description: str
    dayOfWeek: str