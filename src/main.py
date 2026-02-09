"""
Main module for the Python project.
"""


def hello(name: str) -> str:
    """
    Greet someone by name.
    
    Args:
        name: The person's name
        
    Returns:
        A greeting message
    """
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(hello("World"))
