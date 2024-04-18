import { Button, Card, FormControl, FormLabel, Input, Select, Textarea } from '@mui/joy';

const NewProject = () => {
  return (
    <Card className='bg-white flex-1' sx={{ padding: '30px' }}>
      <form action='' className='flex flex-col gap-4'>
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input></Input>
        </FormControl>
        <section className='flex flex-row gap-4'>
          <FormControl className='flex-1'>
            <FormLabel>Client</FormLabel>
            <Select></Select>
          </FormControl>
          <FormControl className='flex-1'>
            <FormLabel>Category</FormLabel>
            <Select></Select>
          </FormControl>
          <FormControl className='flex-1'>
            <FormLabel>Matter</FormLabel>
            <Input></Input>
          </FormControl>
        </section>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea minRows={5} />
        </FormControl>
        <section className='grid grid-cols-2 w-full gap-4'>
          <FormControl>
            <FormLabel>One</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>One</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>One</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>One</FormLabel>
            <Select />
          </FormControl>
        </section>
        <section className='flex mt-10 gap-4 justify-end'>
          <Button>Cancel</Button>
          <Button>Add Project</Button>
        </section>
      </form>
    </Card>
  );
};

export default NewProject;
