"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { differenceInDays, format, formatDistanceToNow, parseISO } from "date-fns";
import MoodAnalyticsSkeleton from "./analytics-loading";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "@/ReduxStore/Store";
import { userDataType } from "@/ReduxStore/Slices/userData.slice";
import { filterJournalsForAnalytics } from "@/lib/filterJournalsForAnalytics";

const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "30d", label: "Complete" },
];


const MoodAnalytics = () => {
  const [period, setPeriod] = useState<string>("7d");
  const [data, setData] = useState<any>([]);
  const { isLoaded, user } = useUser();
  const { pathname } = useLocation();
  const userData = useSelector((state: StoreType) => state.userData) as userDataType;

  useEffect(() => {
    if (!isLoaded || !userData?.email || !userData?.createdAt) return;
    if(period == "7d") {
      let filteredData = filterJournalsForAnalytics(1, userData.journalEntries, userData?.createdAt);
      setData(filteredData);
    } else if(period == "15d") {
      let filteredData = filterJournalsForAnalytics(2, userData.journalEntries, userData?.createdAt);
      setData(filteredData);
    } else if(period == "30d") {
      let filteredData = filterJournalsForAnalytics(3, userData.journalEntries, userData?.createdAt);
      // let filteredData = userData.journalEntries;
      setData(filteredData);
    }
  }, [period, isLoaded, userData?.journalEntries?.length, pathname]);

  if (!isLoaded || !userData?.email) {
    return <MoodAnalyticsSkeleton />;
  }


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-orange-600">Average Mood: {payload[0].value}</p>
          <p className="text-blue-600">Entries: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>
        <Select value={period} onValueChange={(value) => setPeriod(value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {userData.journalEntries.length === 0 ? (
        <div>
          No Entries Found.{" "}
          <Link to="/journal/write" className="underline text-orange-400">
            Write New
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium">
                  {user?.emailAddresses[0].emailAddress}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold">
                  {user?.username}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  ~ Joined on {format(new Date(parseInt(userData.createdAt)), "MMM d, yyyy")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium">
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.journalEntries.length} Total Entries</div>
                <p className="text-xs text-muted-foreground mt-1 w-[60]">
                  ~{Math.ceil((
                      differenceInDays(new Date(), new Date(parseInt((userData as userDataType).createdAt))) > 7
                    ? 
                      userData.journalEntries.length / 7
                    :
                    ( userData.journalEntries.length / differenceInDays(new Date(), new Date(parseInt((userData as userDataType).createdAt))) ) * 7
                    ))} entries per week estimated
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mood Timeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Entries Analysis</CardTitle>
            </CardHeader> 
            <CardContent>
              {data.length > 0 &&
                <div className="h-[300px] w-full pt-[5px] pr-[30px] pl-5 pb-[5px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={730} height={250} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="date" stroke="#82ca9d" strokeWidth={3} />
                      <Line type="monotone" dataKey="journalEntry" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MoodAnalytics;
