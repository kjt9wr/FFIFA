import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Owner } from "../../interfaces/interfaces";
import React from "react";

const AddTradeForm = () => {
  const [activeOwners, setActiveOwners] = useState([]);
  useEffect(() => {
    const getOwnerData = async () => {
      await axios.get("http://localhost:5000/owner/").then((response) => {
        setActiveOwners(response.data.filter((owner: Owner) => owner.active));
        console.log(activeOwners);
      });
    };

    getOwnerData();
  }, [activeOwners]);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      owner1: "",
      owner2: "",
    },
  });

  console.log(getValues());

  const firstOwnerList = activeOwners.map((owner) => {
    return {
      value: owner.name,
      label: owner.name,
      name: owner.name,
    };
  });

  console.log(firstOwnerList);
  return (
    <div>
      <h2> Add Trade</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <FormGroup>
              <Label for="owner1Select">Owner 1</Label>
              <Select options={firstOwnerList} {...register("owner1")} />
              {/* <Input
                id="exampleSelect"
                name="select"
                type="select"
                {...register("owner1")}
              >
                {activeOwners.map((owner) => {
                  return (
                    <option value={owner.name} id={owner.id} key={owner.id}>
                      {owner.name}
                    </option>
                  );
                })}
              </Input> */}
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup>
              <Label for="owner2Select">Owner 2</Label>
              <Input id="exampleSelect" name="select" type="select">
                <option>1</option>
                <option>2</option>
              </Input>
            </FormGroup>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)}> Save </Button>
      </Form>
    </div>
  );
};

export default AddTradeForm;
