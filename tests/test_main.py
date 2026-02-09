"""
Tests for the main module.
"""
from src.main import hello


def test_hello():
    """Test the hello function."""
    assert hello("Alice") == "Hello, Alice!"


def test_hello_world():
    """Test hello with default name."""
    assert hello("World") == "Hello, World!"
