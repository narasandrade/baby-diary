import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import type { Activity } from "../../../../../shared/types/activity";
import { formatDate, formatTime } from "../../../utils/date/dateUtils";
import { DeleteActivityButton, EditActivityNotesButton } from "../index";

export function ActivityItem(activity: Activity) {
  const { type, createdAt, notes, updatedAt } = activity;
  const [truncateNotes, setTruncateNotes] = useState(true);

  const displayDate = formatDate(createdAt);
  const displayTime = formatTime(createdAt);

  return (
    <Card
      sx={{
        border: 1,
        borderColor: "primary.light",
        maxHeight: "fit-content",
        maxWidth: "200px",
        marginBottom: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 1,
        }}
      >
        <div style={{ flex: 8 }}>
          <Typography
            gutterBottom
            sx={{
              color: "text.primary",
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Bad Script",
              textDecoration: "underline",
              textDecorationStyle: "wavy",
            }}
          >
            {type}
          </Typography>

          {notes && (
            <Typography
              gutterBottom
              sx={{
                fontSize: 12,
                background: "action.hover",
                color: "text.secondary",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                padding: 0.5,
                marginRight: 1,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
              onClick={(e) => {
                const target = e.target as HTMLDivElement;

                if (truncateNotes) {
                  target.style.webkitLineClamp = "unset";
                  setTruncateNotes(false);
                } else {
                  target.style.webkitLineClamp = "3";
                  setTruncateNotes(true);
                }
              }}
            >
              {notes}
            </Typography>
          )}

          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 13 }}
          >
            {displayDate}
          </Typography>

          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            {displayTime}
          </Typography>

          {createdAt !== updatedAt && (
            <Typography
              sx={{ color: "text.secondary", fontSize: 12, marginTop: 1 }}
            >
              (Edited)
            </Typography>
          )}
        </div>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <DeleteActivityButton id={activity._id} />

          <EditActivityNotesButton activity={activity} />
        </div>
      </CardContent>
    </Card>
  );
}
