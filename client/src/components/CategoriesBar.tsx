import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CategoriesBar: React.FC = () => {
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </Box>
    );
};

export default CategoriesBar;
