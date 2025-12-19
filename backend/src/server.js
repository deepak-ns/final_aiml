import app from "./app.js";
import { startPipelinePolling } from "./services/pipeline.service.js";

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startPipelinePolling();
});
