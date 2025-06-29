"use client";

import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const navigate = useNavigate();

  // List of titles to add id/domain to URL and check localStorage for
  const requireIdDomain = new Set([
    "Customer Summary",
    "Risk Profile",
    "Risk Assessments",
    "Domains",
    "IP Addresses",
    "Questionnaires",
    "Additional Evidence",
    "Vulnerabilities",
    "Fourth Parties",
    "Modified Risks",
    "Remediation",
  ]);

  // Handler for link clicks
  const handleClick = (e: React.MouseEvent, itemUrl: string, title: string) => {
    e.preventDefault();

    if (requireIdDomain.has(title)) {
      const id = localStorage.getItem("customerId");
      const domain = localStorage.getItem("customerDomain");

      if (!id || !domain) {
        alert("Please select domain to monitor");
        navigate("/customer-portfolio");
        return;
      }

      // Construct url with id/domain
      const newUrl = `${itemUrl}/${id}/${domain}`;
      navigate(newUrl);
      return;
    }

    // For other items, just navigate normally
    navigate(itemUrl);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return (
            <React.Fragment key={item.title}>
              {item.items && item.items.length > 0 ? (
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                onClick={(e) =>
                                  handleClick(e, subItem.url, subItem.title)
                                }
                              >
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <a
                    href={item.url}
                    onClick={(e) => handleClick(e, item.url, item.title)}
                  >
                    <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </a>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
