from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from . import models, schemas
from .deps import get_db


router = APIRouter()


@router.get("/tasks", response_model=List[schemas.Task])
def list_tasks(
    assignee_id: Optional[UUID] = None,
    created_by_id: Optional[UUID] = None,
    team_id: Optional[UUID] = None,
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
):
    query = db.query(models.Task)
    if assignee_id:
        query = query.filter(models.Task.assignee_id == assignee_id)
    if created_by_id:
        query = query.filter(models.Task.created_by_id == created_by_id)
    if team_id:
        query = query.filter(models.Task.team_id == team_id)
    if status_filter:
        query = query.filter(models.Task.status == status_filter)
    return query.order_by(models.Task.due_date.asc().nullslast()).all()


@router.post("/tasks", response_model=schemas.Task, status_code=status.HTTP_201_CREATED)
def create_task(task_in: schemas.TaskCreate, db: Session = Depends(get_db)):
    task = models.Task(**task_in.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: UUID, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.patch("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: UUID, task_in: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task


@router.get("/meetings", response_model=List[schemas.Meeting])
def list_meetings(
    user_id: Optional[UUID] = None,
    team_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
):
    query = db.query(models.Meeting)
    if team_id:
        query = query.filter(models.Meeting.team_id == team_id)
    # Simple filter for user participation can be added later
    return query.order_by(models.Meeting.start_at.asc()).all()


@router.post("/meetings", response_model=schemas.Meeting, status_code=status.HTTP_201_CREATED)
def create_meeting(meeting_in: schemas.MeetingCreate, db: Session = Depends(get_db)):
    meeting = models.Meeting(**meeting_in.model_dump())
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting


@router.get("/meetings/{meeting_id}", response_model=schemas.Meeting)
def get_meeting(meeting_id: UUID, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting


@router.patch("/meetings/{meeting_id}", response_model=schemas.Meeting)
def update_meeting(meeting_id: UUID, meeting_in: schemas.MeetingUpdate, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    update_data = meeting_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(meeting, field, value)

    db.commit()
    db.refresh(meeting)
    return meeting
