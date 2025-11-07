export interface Experience {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate?: string; // optional to support current positions without an end date
    description: string;
    current: boolean;
}
