/*
 * @Author: Mecil Meng
 * @Date: 2025-11-12 16:15:05
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-12 19:51:14
 * @FilePath: /nodebase/src/app/api/webhooks/stripe/route.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */

import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query parameter: workflowId.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const stripeData = {
      eventId: body.id,
      eventType: body.type,
      timestamp: body.created,
      livemode: body.livemode,
      raw: body.data?.object,
    };

    // Trigger an Inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process Stripe event." },
      { status: 500 }
    );
  }
}
