const { CircularProgress, Box } = require("@material-ui/core");

const Spinner = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    bottom="0"
    right="0"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
