import Button from "@mui/material/Button";
import { useState, type ChangeEvent } from "react";

import {
  ACTIVITY_OPTIONS,
  type ActivityType,
} from "../../../../shared/types/activity";
import { isValidActivity } from "../../../../shared/utils/utils";
import { createActivity } from "../../services/activityService";

export function AddActivityForm() {
  const [selected, setSelected] = useState<ActivityType>("FEED");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isValidActivity(value)) {
      setSelected(value);
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Select the type of activity:</legend>

        {ACTIVITY_OPTIONS.map((option) => (
          <label key={option} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="activity"
              value={option}
              checked={selected === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}

        <p>
          Selected: <strong>{selected}</strong>
        </p>
      </fieldset>

      <div>
        <Button
          variant="contained"
          onClick={() => {
            createActivity({
              type: selected,
            });
          }}
        >
          Add Activity
        </Button>
      </div>
    </form>
  );
}
