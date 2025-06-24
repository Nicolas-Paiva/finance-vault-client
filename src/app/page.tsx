import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {ModeToggle} from '@/components/ui/ThemeToggle';
import {Button} from '@/components/ui/button';

export default function Home() {
    return (
        <>
            <ModeToggle/>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
                <Button>Click here</Button>
            </Card>
        </>
    );
}
