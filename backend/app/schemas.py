from datetime import date, datetime, time
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    team_id: UUID
    assignee_id: Optional[UUID] = None
    priority: str = "medium"
    due_date: Optional[date] = None
    due_time: Optional[time] = None


class TaskCreate(TaskBase):
    created_by_id: UUID


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assignee_id: Optional[UUID] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    progress: Optional[int] = None


class Task(TaskBase):
    id: UUID
    status: str
    progress: int

    class Config:
        orm_mode = True


class MeetingBase(BaseModel):
    title: str
    description: Optional[str] = None
    team_id: UUID
    start_at: datetime
    end_at: Optional[datetime] = None
    location: Optional[str] = None
    owner_id: UUID
    priority: str = "medium"


class MeetingCreate(MeetingBase):
    pass


class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_at: Optional[datetime] = None
    end_at: Optional[datetime] = None
    location: Optional[str] = None
    priority: Optional[str] = None


class Meeting(MeetingBase):
    id: UUID

    class Config:
        orm_mode = True
