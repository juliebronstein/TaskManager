import React, { useState } from "react";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import { BiChevronUp } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { FiFolderPlus } from "react-icons/fi";
import { Collapse } from "react-bootstrap";
import { ConvertColor } from "./ConvertColor";

const Collaps = ({ title, options, children, handelClick, className }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("5");
  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className={`cursor-pointer border-radius-up f-sidebare  ps-3 ${
          open ? "bg-darker" : null
        } `}
        onClick={toggleCollapse}
        aria-expanded={open}
      >
        <span className="icon mt-1">
          {" "}
          {open ? <HiOutlineFolderMinus /> : <FiFolderPlus />}
        </span>
        {title}
        <span className="mt-1">
          {open ? <BiChevronUp /> : <BiChevronDown />}
        </span>
      </div>
      {options && (
        <Collapse in={open} className="bg-darker border-radius-d ps-4 ">
          <div id="collapse ">
            {options &&
              options?.map((option) => (
                <div
                  key={option?.id + "_"}
                  className={`d-flex flex-row pointer col-12 ${className} ${id===option?.id? `${className}` +"-focus":""}`}
                  onClick={() => {
                    handelClick(option?.id);
                    setId(option?.id);
                  }}
                >
                  {option?.color && (
                    <ConvertColor
                      item={option?.color}
                      className="d-flex color-box"
                    />
                  )}
                  <div
                    className="d-flex  "
                    key={option?.id + "_" + option?.value}
                  >
                    {option?.value}
                  </div>
                </div>
              ))}
            {children}
          </div>
        </Collapse>
      )}
    </>
  );
};

export default Collaps;
