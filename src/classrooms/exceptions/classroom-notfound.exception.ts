import { NotFoundException } from "@nestjs/common";

class ClassroomNotFoundException extends NotFoundException {
  constructor(classroomId: number) {
    super(`Classroom with id ${classroomId} not found`);
  }
}

export default ClassroomNotFoundException;