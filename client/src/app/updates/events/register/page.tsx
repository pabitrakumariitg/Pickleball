"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Upload, Calendar, MapPin, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getApiUrl } from "@/config";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

export default function EventRegistrationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");
    const eventName = searchParams.get("eventName") || "Pickleball Event";
    const eventDate = searchParams.get("eventDate") || "16–17 August 2025";
    const eventLocation = searchParams.get("eventLocation") || "Akim astroturf Arena, Kohima";
    const { toast } = useToast();

    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
    const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState<string>("");
    const [uploadingPayment, setUploadingPayment] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Player 1 details
        player1FullName: "",
        player1Age: "",
        player1Email: "",
        player1Phone: "",

        // Player 2 details
        player2FullName: "",
        player2Age: "",
        player2Email: "",
        player2Phone: "",

        // Team details
        teamName: "",
        cityTown: "",

        // Category
        category: "",

        // Payment
        paymentMethod: "upi",
        transactionId: "",

        // Consent
        photoConsent: false,
        digitalSignature: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData({ ...formData, [name]: checked });
        // Clear error when user checks
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        // Clear error when user selects
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPaymentScreenshot(file);
            // Clear any previous errors
            setErrors((prev) => ({ ...prev, paymentScreenshot: "" }));
        }
    };

    const handleUploadPaymentScreenshot = async () => {
        if (!paymentScreenshot) {
            setErrors((prev) => ({ ...prev, paymentScreenshot: "Please select a payment screenshot" }));
            return false;
        }

        try {
            setUploadingPayment(true);

            // Direct upload to backend without authentication
            const formData = new FormData();
            formData.append('photo', paymentScreenshot);
            formData.append('folder', 'pickleball/payments');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            setPaymentScreenshotUrl(data.data.photo.url);
            return true;
        } catch (error) {
            console.error("Error uploading payment screenshot:", error);
            setErrors((prev) => ({ ...prev, paymentScreenshot: "Failed to upload payment screenshot. Please try again." }));
            return false;
        } finally {
            setUploadingPayment(false);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validate Player 1 details
        if (!formData.player1FullName.trim()) {
            newErrors.player1FullName = "Player 1 full name is required";
        }

        if (!formData.player1Phone.trim()) {
            newErrors.player1Phone = "Player 1 phone number is required";
        }

        if (!formData.player1Email.trim()) {
            newErrors.player1Email = "Player 1 email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.player1Email)) {
            newErrors.player1Email = "Please enter a valid email address";
        }

        // Validate Player 2 details
        if (!formData.player2FullName.trim()) {
            newErrors.player2FullName = "Player 2 full name is required";
        }

        if (!formData.player2Phone.trim()) {
            newErrors.player2Phone = "Player 2 phone number is required";
        }

        if (!formData.player2Email.trim()) {
            newErrors.player2Email = "Player 2 email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.player2Email)) {
            newErrors.player2Email = "Please enter a valid email address";
        }

        // Validate Team details
        if (!formData.teamName.trim()) {
            newErrors.teamName = "Team/Pair name is required";
        }

        if (!formData.cityTown.trim()) {
            newErrors.cityTown = "City/Town is required";
        }

        // Validate Category
        if (!formData.category) {
            newErrors.category = "Please select a category";
        }

        // Payment validation
        if (!paymentScreenshotUrl) {
            newErrors.paymentScreenshot = "Please upload your payment screenshot";
        }

        // Consent validation
        if (!formData.photoConsent) {
            newErrors.photoConsent = "You must agree to the Terms & Conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form
        const isValid = validateForm();
        if (!isValid) {
            // validateForm already sets the errors internally, so we don't need to set them again here
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload payment screenshot first if not already uploaded
            if (!paymentScreenshotUrl) {
                const uploadSuccess = await handleUploadPaymentScreenshot();
                if (!uploadSuccess) {
                    setIsSubmitting(false);
                    return;
                }
            }

            // Map category values to the format expected by the backend
            const categoryMapping: Record<string, string> = {
                'mens_doubles': "Men's Doubles",
                'womens_doubles': "Women's Doubles",
            };

            // Create JSON data object for API
            const registrationData = {
                eventId: eventId || '',
                teamName: formData.teamName,
                player1: {
                    fullName: formData.player1FullName,
                    phoneNumber: formData.player1Phone,
                    email: formData.player1Email,
                    age: formData.player1Age
                },
                player2: {
                    fullName: formData.player2FullName,
                    phoneNumber: formData.player2Phone,
                    email: formData.player2Email,
                    age: formData.player2Age
                },
                category: categoryMapping[formData.category],
                paymentAmount: '1500',
                paymentScreenshot: paymentScreenshotUrl,
                waiverAccepted: formData.photoConsent,
                rulesAccepted: formData.photoConsent,
                photoConsent: formData.photoConsent,
                digitalSignature: formData.player1FullName
            };

            // Send data to API
            const response = await fetch('/api/registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                // Extract the error message from the backend response
                const errorMessage = errorData.message ||
                    (errorData.error && errorData.error.message) ||
                    'Registration failed';
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Registration successful:", data);

            // Show success message and redirect after a delay
            setIsSuccess(true);
            setTimeout(() => {
                router.push(`/`);
            }, 3000);
        } catch (error) {
            console.error("Error submitting form:", error);

            // Get the error message
            const errorMessage = error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.";

            // Show error toast notification
            toast({
                title: "Registration Failed",
                description: errorMessage,
                variant: "destructive",
                duration: 5000, // Show for 5 seconds to ensure visibility
            });

            setErrors({
                form: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold mt-8 mb-2">🏓  Kohima Open Tournament Registration</h1>
                        <p className="text-foreground/70 mb-4">Welcome to the official registration for the Kohima Open Tournament organized by the Nagaland Pickleball Association!</p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-6 text-sm">
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-primary" />
                                <span>Venue: {eventLocation}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-primary" />
                                <span>Event Dates: {eventDate}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-primary" />
                                <span>Time: 9:00 AM onwards</span>
                            </div>
                        </div>
                        <div className="mt-2 text-sm">
                            <span className="font-medium">Last Date to Register:</span> 14 August 2025, 12:00 PM
                        </div>
                    </div>

                    {isSuccess ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg p-8 text-center">
                            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
                            <p className="mb-4">Thank you for registering for {eventName}.</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">You will be redirected back to the event page shortly...</p>
                        </div>
                    ) : (
                        <div className="card border border-border p-8">
                            {errors.form && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-md flex items-center gap-2 text-red-700 dark:text-red-400">
                                    <AlertCircle className="h-5 w-5" />
                                    <p>{errors.form}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Event Information */}
                                {/* <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">🎯 Event Information</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="eventName">Event Name</Label>
                                            <Input id="eventName" value={eventName} disabled />
                                        </div>
                                        <div>
                                            <Label htmlFor="eventDate">Event Date</Label>
                                            <Input id="eventDate" value={eventDate} disabled />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="eventLocation">Event Location</Label>
                                            <Input id="eventLocation" value={eventLocation} disabled />
                                        </div>
                                    </div>
                                </div> */}

                                {/* Player 1 Information */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">👤 Player 1 Information</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <Label htmlFor="player1FullName" className={errors.player1FullName ? "text-red-500" : ""}>
                                                Full Name (Player 1) *
                                            </Label>
                                            <Input
                                                id="player1FullName"
                                                name="player1FullName"
                                                value={formData.player1FullName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 1's full name"
                                                className={errors.player1FullName ? "border-red-500" : ""}
                                            />
                                            {errors.player1FullName && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player1FullName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="player1Phone" className={errors.player1Phone ? "text-red-500" : ""}>
                                                Phone Number (Player 1) *
                                            </Label>
                                            <Input
                                                id="player1Phone"
                                                name="player1Phone"
                                                value={formData.player1Phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 1's phone number"
                                                className={errors.player1Phone ? "border-red-500" : ""}
                                            />
                                            {errors.player1Phone && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player1Phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="player1Age">
                                                Age (Player 1)
                                            </Label>
                                            <Input
                                                id="player1Age"
                                                name="player1Age"
                                                type="number"
                                                value={formData.player1Age}
                                                onChange={handleInputChange}
                                                placeholder="Enter player 1's age"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="player1Email" className={errors.player1Email ? "text-red-500" : ""}>
                                                Email (Player 1) *
                                            </Label>
                                            <Input
                                                id="player1Email"
                                                name="player1Email"
                                                type="email"
                                                value={formData.player1Email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 1's email address"
                                                className={errors.player1Email ? "border-red-500" : ""}
                                            />
                                            {errors.player1Email && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player1Email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Player 2 Information */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">👤 Player 2 Information</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <Label htmlFor="player2FullName" className={errors.player2FullName ? "text-red-500" : ""}>
                                                Full Name (Player 2) *
                                            </Label>
                                            <Input
                                                id="player2FullName"
                                                name="player2FullName"
                                                value={formData.player2FullName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 2's full name"
                                                className={errors.player2FullName ? "border-red-500" : ""}
                                            />
                                            {errors.player2FullName && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player2FullName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="player2Phone" className={errors.player2Phone ? "text-red-500" : ""}>
                                                Phone Number (Player 2) *
                                            </Label>
                                            <Input
                                                id="player2Phone"
                                                name="player2Phone"
                                                value={formData.player2Phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 2's phone number"
                                                className={errors.player2Phone ? "border-red-500" : ""}
                                            />
                                            {errors.player2Phone && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player2Phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="player2Age">
                                                Age (Player 2)
                                            </Label>
                                            <Input
                                                id="player2Age"
                                                name="player2Age"
                                                type="number"
                                                value={formData.player2Age}
                                                onChange={handleInputChange}
                                                placeholder="Enter player 2's age"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="player2Email" className={errors.player2Email ? "text-red-500" : ""}>
                                                Email (Player 2) *
                                            </Label>
                                            <Input
                                                id="player2Email"
                                                name="player2Email"
                                                type="email"
                                                value={formData.player2Email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter player 2's email address"
                                                className={errors.player2Email ? "border-red-500" : ""}
                                            />
                                            {errors.player2Email && (
                                                <p className="text-xs text-red-500 mt-1">{errors.player2Email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Team Information */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">🏆 Team Information</h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="teamName" className={errors.teamName ? "text-red-500" : ""}>
                                                Team/Pair Name *
                                            </Label>
                                            <Input
                                                id="teamName"
                                                name="teamName"
                                                value={formData.teamName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your team or pair name"
                                                className={errors.teamName ? "border-red-500" : ""}
                                            />
                                            {errors.teamName && (
                                                <p className="text-xs text-red-500 mt-1">{errors.teamName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="cityTown" className={errors.cityTown ? "text-red-500" : ""}>
                                                City/Town *
                                            </Label>
                                            <Input
                                                id="cityTown"
                                                name="cityTown"
                                                value={formData.cityTown}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your city or town"
                                                className={errors.cityTown ? "border-red-500" : ""}
                                            />
                                            {errors.cityTown && (
                                                <p className="text-xs text-red-500 mt-1">{errors.cityTown}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">🏅 Category</h2>
                                    <div>
                                        <Label className={errors.category ? "text-red-500" : ""}>
                                            Select Category *
                                        </Label>
                                        <RadioGroup
                                            value={formData.category}
                                            onValueChange={(value) => handleRadioChange("category", value)}
                                            className="grid gap-2 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="mens_doubles" id="mens_doubles" />
                                                <Label htmlFor="mens_doubles">Men's Doubles</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="womens_doubles" id="womens_doubles" />
                                                <Label htmlFor="womens_doubles">Women's Doubles</Label>
                                            </div>

                                        </RadioGroup>
                                        {errors.category && (
                                            <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Registration Fee */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-2">💰 Registration Fee</h2>
                                    <div className="bg-muted/50 p-4 rounded-md mb-4">
                                        <p className="font-medium">Registration Fee: ₹1,500 per team</p>
                                        <p className="text-sm text-foreground/70 mt-1">Please make the payment and upload the screenshot below.</p>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label>Payment QR Code</Label>
                                            <div className="mt-2 border border-border rounded-md p-4 flex flex-col items-center">
                                                <div className="bg-white p-2 rounded-md mb-2">
                                                    <img
                                                        src="/qr-for-kohima.jpg"
                                                        alt="Payment QR Code"
                                                        className="w-48 h-48 object-contain"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "/placeholder-qr.png";
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-sm text-center">Scan and Pay ₹1,500</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="paymentScreenshot" className={errors.paymentScreenshot ? "text-red-500" : ""}>
                                                Payment Screenshot Upload *
                                            </Label>
                                            <div className="mt-2">
                                                <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center">
                                                    <Upload className="h-8 w-8 text-foreground/50 mb-2" />
                                                    <p className="text-sm text-foreground/70 mb-2">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-foreground/50 mb-4">PNG, JPG or JPEG (max 10MB)</p>
                                                    <Input
                                                        id="paymentScreenshot"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => document.getElementById("paymentScreenshot")?.click()}
                                                        disabled={uploadingPayment}
                                                    >
                                                        Select File
                                                    </Button>
                                                    {paymentScreenshot && !paymentScreenshotUrl && (
                                                        <Button
                                                            type="button"
                                                            variant="secondary"
                                                            size="sm"
                                                            className="ml-2"
                                                            onClick={handleUploadPaymentScreenshot}
                                                            disabled={uploadingPayment}
                                                        >
                                                            {uploadingPayment ? "Uploading..." : "Upload Now"}
                                                        </Button>
                                                    )}
                                                </div>
                                                {paymentScreenshot && !paymentScreenshotUrl && (
                                                    <p className="text-xs text-green-600 mt-2">
                                                        File selected: {paymentScreenshot.name}
                                                    </p>
                                                )}
                                                {paymentScreenshotUrl && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-green-600">✓ Payment screenshot uploaded successfully</p>
                                                        <img
                                                            src={paymentScreenshotUrl}
                                                            alt="Payment Screenshot"
                                                            className="mt-2 max-h-32 rounded-md border border-border"
                                                        />
                                                    </div>
                                                )}
                                                {errors.paymentScreenshot && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.paymentScreenshot}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Waiver and Consent */}
                                <div className="space-y-4">

                                    <div className="space-y-4">


                                        <div className="flex items-start space-x-2">
                                            <Checkbox
                                                id="photoConsent"
                                                checked={formData.photoConsent}
                                                onCheckedChange={(checked) => handleCheckboxChange("photoConsent", checked === true)}
                                                className="mt-3"
                                            />
                                            <div className="flex items-center">
                                                <Label htmlFor="photoConsent" className="text-sm mr-1">
                                                    I have read and understood the
                                                </Label>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" className="h-auto p-0 text-sm text-primary underline">
                                                            Terms & Conditions
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Terms & Conditions</DialogTitle>
                                                            <DialogDescription>
                                                                Please read the following terms carefully
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4 text-sm">
                                                            <p className="font-semibold">I hereby declare that the information provided is true and correct to the best of my knowledge. I understand and accept that:</p>

                                                            <ul className="list-disc pl-5 space-y-2">
                                                                <li>The organizers (Nagaland Pickleball Association) will not be held liable for any injury, accident, loss, or damage during the event.</li>
                                                                <li>I am participating at my own risk and will take full responsibility for my physical health and personal belongings.</li>
                                                                <li>I will wear non-marking court shoes or sports shoes with proper grip (no slippers, boots, or studded shoes allowed).</li>
                                                                <li>I will follow the tournament rules, respect referees' decisions, and maintain sportsmanlike conduct at all times.</li>
                                                            </ul>

                                                            <p>Any violation of the above may lead to disqualification or removal from the tournament.</p>
                                                        </div>
                                                        {/* <DialogFooter className="sm:justify-center">
                                                            <Button type="button" variant="secondary">
                                                                I Understand
                                                            </Button>
                                                        </DialogFooter> */}
                                                    </DialogContent>
                                                </Dialog>
                                                <Label htmlFor="photoConsent" className="text-sm ml-1">
                                                    of the event.
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            <span>Complete Registration</span>
                                        )}
                                    </Button>
                                    {errors.form && (
                                        <p className="text-xs text-red-500 mt-1">{errors.form}</p>
                                    )}
                                    {isSuccess && (
                                        <p className="text-xs text-green-500 mt-1">Registration successful! Thank you for registering.</p>
                                    )}
                                    <p className="text-xs text-center text-foreground/70 mt-4">
                                        For any questions regarding registration, please contact us at nagalandpickleball@gmail.com


                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
