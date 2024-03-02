"use client"
import React, { useState } from 'react';
import { Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';

export const NavBarMenu = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="p-8">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Product 1">
          <ProductItem
            title="Product 1"
            description="This is a cool product."
            href="/product1"
            src="/path/to/image.jpg"
          />
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Product 2">
          <div>Content for Product 2</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome } from "react-icons/fa";
import { FaBookDead } from "react-icons/fa";

const navLinks = [
  { name: "Home", link: "/", icon: <FaHome /> },
  { name: "About", link: "/about", icon: <FaBookDead /> },
  { name: "Contact", link: "/contact", icon: <FaBookDead /> },
  { name: "Blog", link: "/blog", icon: <FaBookDead /> },
  { name: "Projects", link: "/projects", icon: <FaBookDead /> }
];

export const NavBarFloating = () => {
  return (
    <>
      <FloatingNav navItems={navLinks} />
    </>
  );
};
