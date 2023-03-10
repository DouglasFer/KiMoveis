import { z } from "zod";
import {
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/schedule.schemas";

export type iSchedule = z.infer<typeof scheduleSchema>;
