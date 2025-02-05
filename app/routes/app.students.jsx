// studentsdata.display.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server"; // Adjust the import based on your project structure
import { Page, Card, Text, BlockStack } from "@shopify/polaris";

// Loader function to fetch data from the database
export async function loader() {
    const students = await db.Settingstable.findMany();
    return json({ students });
}

// Main component for displaying students' data
export default function DisplayStudentsData() {
    const { students } = useLoaderData();

    return (
        <Page>
            <BlockStack gap="400">
                <Text as="h1" variant="headingLg">Students Data</Text>
                {students.map((student) => (
                    <Card key={student.id} sectioned>
                        <Text variant="headingMd">{student.name}</Text>
                        <Text>{`Phone: ${student.phone}`}</Text>
                        <Text>{`Email: ${student.email}`}</Text>
                        <Text>{`Description: ${student.description}`}</Text>
                    </Card>
                ))}
            </BlockStack>
        </Page>
    );
}
