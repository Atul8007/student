import {
    Box,
    Card,
    Layout,
    Page,
    Text,
    BlockStack,
    InlineGrid,
    TextField,
    Button,
    Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import db from "../db.server";

// Loader function to fetch data from the database
export async function loader() {
    let data = await db.Settingstable.findMany();
    return json({ data });
}

// Action function to handle form submissions
export async function action({ request }) {
    let formData = await request.formData();
    formData = Object.fromEntries(formData);

    await db.Settingstable.create({
        data: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            description: formData.description,
        },
    });

    return json({ message: "Data added to DB" });
}

// Main component for the Students Data page
export default function Studentsdata() {
    const { data } = useLoaderData();
    const [formState, setFormState] = useState({});
    const [modalActive, setModalActive] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setModalActive(true);
    };

    const handleSave = () => {
        // Submit the form programmatically
        document.getElementById("student-form").submit(); 
        setModalActive(false);
    };

    const handleCancel = () => {
        setModalActive(false);
    };

    return (
        <Page>
            <TitleBar title="Students Data Page" />
            <BlockStack gap={{ xs: "800", sm: "400" }}>
                <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
                    <Box
                        as="section"
                        paddingInlineStart={{ xs: 400, sm: 0 }}
                        paddingInlineEnd={{ xs: 400, sm: 0 }}
                    >
                        <BlockStack gap="400">
                            <Text as="h3" variant="headingMd">
                                Fill in the Student Details
                            </Text>
                            <Text as="p" variant="bodyMd">
                                Please complete the form below and click Save.
                            </Text>

                            <Card roundedAbove="sm" sectioned>
                                <Form id="student-form" method="POST" onSubmit={handleSubmit}>
                                    <BlockStack gap="400">
                                        <TextField
                                            label="Name"
                                            name="name"
                                            value={formState?.name}
                                            onChange={(value) => setFormState({ ...formState, name: value })}
                                            placeholder="Enter student's name"
                                            autoComplete="off"
                                        />
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            value={formState?.phone}
                                            onChange={(value) => setFormState({ ...formState, phone: value })}
                                            placeholder="Enter phone number"
                                            autoComplete="off"
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={formState?.email}
                                            onChange={(value) => setFormState({ ...formState, email: value })}
                                            placeholder="Enter email address"
                                            autoComplete="off"
                                        />
                                        <TextField
                                            label="Description"
                                            name="description"
                                            value={formState?.description}
                                            onChange={(value) => setFormState({ ...formState, description: value })}
                                            placeholder="Enter additional details"
                                            autoComplete="off"
                                        />
                                        <Button primary submit={true}>Save</Button>
                                    </BlockStack>
                                </Form>
                            </Card>

                            {/* Modal for Save or Cancel */}
                            <Modal
                                open={modalActive}
                                onClose={handleCancel}
                                title="Confirm Save"
                                primaryAction={{
                                    content: 'Save',
                                    onAction: handleSave,
                                }}
                                secondaryActions={[
                                    {
                                        content: 'Cancel',
                                        onAction: handleCancel,
                                    },
                                ]}
                            >
                                <Modal.Section>
                                    <Text>Are you sure you want to save these changes?</Text>
                                </Modal.Section>
                            </Modal>
                        </BlockStack>
                    </Box>

                    <Box
                        as="section"
                        paddingInlineStart={{ xs: 400, sm: 0 }}
                        paddingInlineEnd={{ xs: 400, sm: 0 }}
                    >
                        {/* Additional content can go here */}
                    </Box>
                </InlineGrid>
            </BlockStack>
        </Page>
    );
}
