import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LinkedList } from "./LinkedList";

const Display = styled.div`
  background: white;
  margin: 10px 0px;
  border-radius: ${props => props.theme.borderRadius};
  padding: 20px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & label {
    width: 100%;
    margin: 8px 0px;
    font-weight: bold;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: ${props => props.theme.grey3};
  }
`;

const InlineInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  & input {
    flex: 1;
    padding: 1em;
    border: 1px solid ${props => props.theme.grey3};
    font-size: 17px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    & input {
      border-right: none;
    }
    & button {
      border-left: none;
    }
  }
`;

const Button = styled.button`
  background: #866bff;
  padding: 1em;
  border: 1px solid ${props => props.theme.grey3};
  font-size: 17px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  &:hover {
    background: #8e79ec;
    cursor: pointer;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;

  & button {
    margin-top: 8px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LinkedListChallenges = () => {
  const [list, setList] = useState(new LinkedList());
  const [displayList, setDisplayList] = useState([]);
  const [reload, setReload] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setDisplayList(list.iterateList());
  }, [list, reload]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (!value) return;
    list.add(value);
    setValue("");
    setReload(!reload);
  };

  const handleRemoveDuplicates = () => {
    list.removeDuplicates();
    setReload(!reload);
  };

  const handleReset = () => {
    setList(new LinkedList());
  };

  return (
    <div>
      <h2>Linked Lists!</h2>
      <Input>
        <label htmlFor="new-node">Add a new value to the list</label>
        <InlineInput>
          <input
            id="new-node"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <Button onClick={handleAdd}>Add</Button>
        </InlineInput>
      </Input>

      <Display>
        {displayList.length ? (
          displayList.map((item, i) => (
            <span key={item + i}>
              {i + 1 === displayList.length ? item : item + " -> "}
            </span>
          ))
        ) : (
          <p>Add something to the Linked List!</p>
        )}
      </Display>
      <Actions>
        <Button onClick={handleRemoveDuplicates}>Remove Duplicates</Button>
        <Button onClick={handleReset}>Reset List</Button>
      </Actions>
    </div>
  );
};

export default LinkedListChallenges;
