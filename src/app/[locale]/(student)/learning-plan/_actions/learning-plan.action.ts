"use server"

import { authOptions } from '@/auth';
import { JSON_HEADER } from '@/lib/constants/shared.constant';
import getToken from '@/lib/utils/get-token';
import { getServerSession } from "next-auth";


export default async function learningPlanAction() {
       const token = await getToken();
        const session = await getServerSession( authOptions );
        console.log("ss", session?.user?.trackId);
        const res = await fetch(`${process.env.API}/learning/advanced_plan`, {
          headers: {
            ...JSON_HEADER,
            Authorization: `Bearer ${token?.accessToken}`,
          },
          body: JSON.stringify({
            track_id: session?.user?.trackId,
          }),
          method: "POST",
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Error Fetching");
        }
        const payload = await res.json();
        return payload;

}
