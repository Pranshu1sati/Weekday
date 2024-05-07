import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import {
  basePay,
  minExperience,
  remote,
  roles,
  companies,
} from "../Data/Filters";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/jobsSlice";
import { debounce } from "../utils/debounce";
import { TextField } from "@mui/material";

const Filters = () => {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  const [isRemoteSelected, setIsRemoteSelected] = useState(null);

  const [valueRoleChange, setRoleChange] = useState(null);
  const [valueExpChange, setExpChange] = useState(null);
  const [valueRemoteChange, setRemoteChange] = useState(null);
  const [valueCompanies, setCompaniesChange] = useState(null);
  const [valueLocation, setLocationChange] = useState("");
  const [valuePayChange, setPayChange] = useState(null);

  const resetOtherFilters = (filterName) => {
    switch (filterName) {
      case "role":
        setExpChange(null);
        setRemoteChange(null);
        setCompaniesChange(null);
        setPayChange(null);
        setLocationChange("");
        break;
      case "minExp":
        setRoleChange(null);
        setRemoteChange(null);
        setCompaniesChange(null);
        setPayChange(null);
        setLocationChange("");
        break;
      case "remote":
        setRoleChange(null);
        setExpChange(null);
        setCompaniesChange(null);
        setPayChange(null);
        setLocationChange("");
        break;
      case "minSalary":
        setRoleChange(null);
        setExpChange(null);
        setRemoteChange(null);
        setCompaniesChange(null);
        setLocationChange("");
        break;
      case "companyName":
        setRoleChange(null);
        setExpChange(null);
        setRemoteChange(null);
        setPayChange(null);
        setLocationChange("");
        break;
      default:
        break;
    }
  };

  const debouncedDispatch = debounce((value) => {
    dispatch(setFilter({ filterBy: "location", filterValue: value }));
  }, 50);

  const handleRoleChange = (event, value) => {
    resetOtherFilters("role");
    console.log(value ? value : "haha");
    setRoleChange(value); // Update state with selected role
    // Dispatch action to set filter
    dispatch(setFilter({ filterBy: "role", filterValue: value?.value }));
  };

  const handleExperienceChange = (event, value) => {
    resetOtherFilters("minExp");
    setExpChange(value);
    dispatch(setFilter({ filterBy: "minExp", filterValue: value?.value }));
  };

  const handleRemoteChange = (event, value) => {
    resetOtherFilters("remote");
    console.log(value?.value);
    setRemoteChange(value);
    dispatch(setFilter({ filterBy: "remote", filterValue: value?.value }));
  };

  const handlePayChange = (event, value) => {
    resetOtherFilters("minSalary");
    setPayChange(value);
    dispatch(setFilter({ filterBy: "minSalary", filterValue: value?.value }));
  };

  const handleCompaniesChange = (event, value) => {
    resetOtherFilters("companyName");
    setCompaniesChange(value);
    dispatch(setFilter({ filterBy: "companyName", filterValue: value?.value }));
  };

  const handleLocationChange = (event) => {
    console.log(event?.target?.value);
    const value = event?.target?.value;
    setLocationChange(value);
    //causing intentional delay so that filtering only happens when the typing is stopped
    if (value.trim() !== "") {
      debouncedDispatch(value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        width: "100%",
      }}
    >
      <Filter
        filters={roles}
        label="Roles"
        isMultiple={false}
        selectedValues={valueRoleChange}
        width="130px"
        onValuesChange={handleRoleChange}
        // onValueChange={(event, values) => handleFilterChange("role", values)}
      />
      <Filter
        filters={minExperience}
        label="Experience"
        isMultiple={false}
        selectedValues={valueExpChange}
        onValuesChange={handleExperienceChange}
      />
      <Filter
        filters={remote}
        label="Remote"
        isMultiple={false}
        selectedValues={valueRemoteChange}
        onValuesChange={handleRemoteChange}
      />
      <Filter
        filters={basePay}
        selectedValues={valuePayChange}
        label="Minimum Base Pay"
        isMultiple={false}
        width="200px"
        onValuesChange={handlePayChange}
      />

      <Filter
        filters={companies}
        selectedValues={valueCompanies}
        label="Companies"
        isMultiple={false}
        width="200px"
        onValuesChange={handleCompaniesChange}
      />
      <TextField
        label="Locations"
        variant="outlined"
        value={valueLocation}
        onChange={handleLocationChange}
        fullWidth
        // size="small"
        sx={{ maxWidth: "200px", fontSize: "11px", padding: "0" }}
      />
    </div>
  );
};

export default Filters;
