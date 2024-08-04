import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import UserButton from "./UserButton";

const NavBar = () => {
  return (
    <nav className="flex w-full justify-between items-center p-5 px-8 dark:bg-black">
      <Logo />
      <div className="flex gap-10">
        <UserButton />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
