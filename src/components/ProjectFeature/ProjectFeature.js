import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";

const ProjectFeature = () => {
  return (
    <Box>
      <Grid container spacing={2} columns={4}>
        <Grid item xs={2} lg={1}>
          <Card
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={500}>
                Total time on project
              </Typography>
              <Typography
                fontSize={24}
                fontWeight={900}
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                03:39<span style={{ marginTop: 4, fontSize: 12 }}>h</span>
              </Typography>
            </Box>
            <WorkOutlineIcon />
          </Card>
        </Grid>
        <Grid item xs={2} lg={1}>
          <Card
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={500}>
                Earnings
              </Typography>
              <Typography
                fontSize={24}
                fontWeight={900}
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                <span style={{ marginTop: 4, fontSize: 12 }}>$</span>2,409.20
              </Typography>
            </Box>
            <LocalAtmIcon />
          </Card>
        </Grid>
        <Grid item xs={2} lg={1}>
          <Card
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={500}>
                Costs
              </Typography>
              <Typography
                fontSize={24}
                fontWeight={900}
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                <span style={{ marginTop: 4, fontSize: 12 }}>$</span>1,260.14
              </Typography>
            </Box>
            <PaymentsOutlinedIcon />
          </Card>
        </Grid>
        <Grid item xs={2} lg={1}>
          <Card
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={500} color={"cyan"}>
                Productivity
              </Typography>
              <Box display={"flex"} alignItems={"end"}>
                <Typography
                  fontSize={24}
                  fontWeight={900}
                  sx={{ display: "flex", alignItems: "start", gap: 1 }}
                >
                  93.57<span style={{ marginTop: 4, fontSize: 12 }}>%</span>
                </Typography>
                <Typography color={"green"}>
                  <ArrowDropUpOutlinedIcon />
                  2.37%
                </Typography>
              </Box>
            </Box>
            <TrendingUpOutlinedIcon sx={{ color: "cyan" }} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectFeature;
